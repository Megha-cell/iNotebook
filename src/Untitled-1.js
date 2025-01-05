const response = await fetch("/echo/json/",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({a: 1, b: 2})
  });
  return response.json();