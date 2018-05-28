

function method<ResponseType>(method: "GET" | "PUT" | "POST", url: string, data?: any): Promise<ResponseType> {
  return new Promise<ResponseType>((resolve, reject) => {
    try {
      const request: XMLHttpRequest = new XMLHttpRequest();

      request.addEventListener("load", () => {
        const json: string = request.responseText;
        if (json) {
          const data: ResponseType = JSON.parse(json) as ResponseType;
          resolve(data);
        } else resolve();
      });
      request.addEventListener("error", (e: Event) => {
        reject(e);
      });

      switch (method) {
        case "GET":
          request.open("GET", url);
          request.send();
          break;
        case "PUT" || "POST":
          request.open(method, url);
          request.send(data);
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function get<ResponseType>(url: string): Promise<ResponseType> {
  return method<ResponseType>("GET", url);
}

export function Put<ResponseType>(url: string, data: any): Promise<ResponseType> {
  return method<ResponseType>("PUT", url, data);
}

export function Post<ResponseType>(url: string, data: any): Promise<ResponseType> {
  return method<ResponseType>("POST", url, data);
}
