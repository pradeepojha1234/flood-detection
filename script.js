document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');
    const outputImage = document.getElementById('outputImage');
    const statusText = document.getElementById('status');
  
    if (fileInput.files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
  
    try {
      statusText.textContent = 'Processing...';
      resultDiv.classList.remove('hidden');
  
      // Send the file to the backend for processing
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to process the image.');
      }
  
      const data = await response.json();
  
      // Display the processed image and result
      outputImage.src = data.processedImageUrl;
      statusText.textContent = data.message || 'Detection complete!';
    } catch (error) {
      console.error('Error:', error);
      statusText.textContent = 'An error occurred. Please try again.';
    }
  });