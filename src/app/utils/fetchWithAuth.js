export async function fetchWithAuth(url, options = {}, router) {
    console.log(router);
    const res = await fetch(url, options);
    console.log("fetchWithAuth", url, options, res);
  
    if (res.status === 401) {
      console.log("Unauthorized, redirecting to login...");
  
        router.push("/login");
        return;
      
    }
  
    return res.json();
  }
  