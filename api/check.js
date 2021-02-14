exports.handler = async (event) => {
    return {
        headers:{
            "Content-Type": "text/html; charset=utf-8"
        },
        
        statusCode: 200,
        body: "api working ✅"
        }
  }