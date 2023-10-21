function DownloadComponent() {

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/download');
      const data = await response.json();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download data', error);
    }
  };

  return (
    <div className="ml-96 border rounded py-2 px-4 mr-5 bg-lime-400">
      <button onClick={handleDownload}>Export Data</button>
    </div>
  );
}

export default DownloadComponent;
