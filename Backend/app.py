# app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from skimage.feature import hog
import joblib

# Load the trained model
model = joblib.load("potato_model.pkl")

categories = ["Healthy", "Early_blight", "Late_blight"]

# FastAPI app
app = FastAPI()

# Enable CORS so React frontend can call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all origins
    allow_methods=["*"],
    allow_headers=["*"],
)

# Feature extraction function
def compute_features(img):
    img = cv2.resize(img, (96, 96))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    hog_feat = hog(
        gray,
        orientations=9,
        pixels_per_cell=(8, 8),
        cells_per_block=(2, 2),
        block_norm='L2-Hys',
        visualize=False
    )

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0,1,2], None, [8,8,8], [0,180,0,256,0,256]).flatten()
    hist = hist / np.sum(hist)

    return np.hstack([hog_feat, hist])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image bytes
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Compute features
    features = compute_features(img).reshape(1, -1)

    # Predict
    pred_idx = model.predict(features)[0]
    result = categories[pred_idx]

    return {"prediction": result}
