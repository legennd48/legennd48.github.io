#!/bin/bash

# Script to generate PDF resume using Chrome headless

HTML_FILE="$(pwd)/public/resume.html"
PDF_FILE="$(pwd)/public/resume.pdf"

echo "Generating PDF resume..."
echo "Input: $HTML_FILE"
echo "Output: $PDF_FILE"

google-chrome --headless --disable-gpu --print-to-pdf="$PDF_FILE" --print-to-pdf-no-header \
  --no-pdf-header-footer --virtual-time-budget=10000 "file://$HTML_FILE"

if [ $? -eq 0 ]; then
    echo "✓ PDF generated successfully at: $PDF_FILE"
    ls -lh "$PDF_FILE"
else
    echo "✗ PDF generation failed"
    exit 1
fi
