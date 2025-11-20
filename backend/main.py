from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# 允许所有来源 (仅用于调试！)
origins = ["*"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # <-- 确保这里是 origins 变量
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


# (接下来是 class ChatRequest 和其他路由...)

class ChatRequest(BaseModel):
    question: str

@app.get("/")
def read_root():
    return {"message": "DocsBot Backend is running"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Save file temporarily
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Ingest
        from ingestion import ingest_file
        num_chunks = await ingest_file(file_path)
        
        # Cleanup
        os.remove(file_path)
        
        return {"filename": file.filename, "status": "Uploaded and Ingested", "chunks": num_chunks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class URLRequest(BaseModel):
    url: str

@app.post("/ingest-url")
async def ingest_url_endpoint(request: URLRequest):
    try:
        from ingestion import ingest_url
        num_chunks = await ingest_url(request.url)
        return {"url": request.url, "status": "URL Ingested", "chunks": num_chunks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        from rag import query_rag
        answer = query_rag(request.question)
        return {"answer": answer}
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/train")
async def train():
    # In this simple version, upload triggers ingestion, so train might be redundant 
    # or could be used for re-indexing. For now, we'll just say it's done.
    return {"status": "Training completed (Ingestion happens on upload)"}
