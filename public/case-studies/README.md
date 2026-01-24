# Case Studies - Slide Images Setup

## Folder Structure

Convert your PowerPoint presentations to PNG images and organize them as follows:

```
public/case-studies/
├── general-overview/
│   ├── slide1.png
│   ├── slide2.png
│   ├── slide3.png
│   ├── slide4.png
│   └── slide5.png
├── for-influencers/
│   ├── slide1.png
│   ├── slide2.png
│   ├── slide3.png
│   └── slide4.png
├── scaled-influencers/
│   ├── slide1.png
│   ├── slide2.png
│   ├── slide3.png
│   ├── slide4.png
│   └── slide5.png
├── ecommerce/
│   ├── slide1.png
│   ├── slide2.png
│   └── slide3.png
├── crm-integration/
│   ├── slide1.png
│   ├── slide2.png
│   └── slide3.png
└── data-processing/
    ├── slide1.png
    ├── slide2.png
    └── slide3.png
```

## How to Convert PowerPoint to Images

1. **Open your .pptx file** in Microsoft PowerPoint
2. Click **File → Save As**
3. Choose **Location**: Select this case-studies folder
4. Choose **Format**: PNG (*.png) or JPEG (*.jpg)
5. Click **Save**
6. PowerPoint will ask: "Do you want to export every slide?"
7. Click **Every Slide**
8. PowerPoint creates a folder with all slides as images
9. Rename the folder and slides according to the structure above

## Naming Convention

- Folders: lowercase with hyphens (e.g., `general-overview`)
- Images: `slide1.png`, `slide2.png`, `slide3.png`, etc.

## Slide Numbers

Update the number of slides in `/src/pages/CaseStudies.tsx` if your presentations have different numbers of slides than shown above.

The slide viewer will automatically display all slides in each folder!
