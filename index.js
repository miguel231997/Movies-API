function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;  
    setTimeout(() => {
      window.location.href = 'find.html?query=' + encodeURIComponent(query);
    }, 1000);
  }