# 🥔 Potato Hub

A complete potato companion app! Combines **Potato Detection AI**, **Potato Disease Detector**, and more for fun and practical use.  

---

## Features

### 🥔 Potato Detector
- Binary classifier to detect whether an image is a potato or not.  
- Trained incrementally using **HOG + SVM**.  
- Supports **data augmentation** to improve detection.  
- Outputs detailed **Potato Intelligence Reports** for model performance.  

### 💊 Potato Disease Detector
- Track diseases in your potato plants.  
- Classifies images into **Healthy**, **Early Blight**, and **Late Blight** categories.  
- Uses HOG + PCA + SVM for robust predictions with data augmentation.  


---

## 📂 Datasets & Credits

### 1. Local Potato Dataset
- **Source:** [images.cv – Potato Image Classification Dataset](https://images.cv/dataset/potato-image-classification-dataset?utm_source=chatgpt.com)  
- **Description:** Contains 128 potato images, used as the positive class (“Potato”) in the potato detection model.  
- **License / Credit:** Images courtesy of images.cv.

### 2. Kaggle Fruit & Vegetable Dataset
- **Source:** [Fruit and Vegetable Image Recognition](https://www.kaggle.com/datasets/kritikseth/fruit-and-vegetable-image-recognition)  
- **Description:** Used as the negative class (“Not-Potato”) for the potato detection model.  
- **License / Credit:** Images courtesy of Kaggle dataset contributors.

### 3. PlantVillage Potato Disease Dataset
- **Source:** [PlantVillage – Potato Disease Dataset](https://www.kaggle.com/datasets/aarishasifkhan/plantvillage-potato-disease-dataset)  
- **Description:** Used for training the potato disease detection model with categories: Healthy, Early Blight, Late Blight.  
- **License / Credit:** Images courtesy of PlantVillage via Kaggle.

---

## 🙏 Acknowledgements

Special thanks to all the **image owners and dataset contributors** for allowing us to use these datasets and images. Your work makes projects like Potato Hub possible!  

---
cd potato-hub
npm install
