import { useState } from "react";

const usePost = (body) => {
  const [data, setData] = useState(null);

    fetch('http://localhost:5173/api/Tasks/CreateTasks', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1
    }),
  }).then((res) => res.json())
  .then((data) => setData(data));

  return [data];
};

export default usePost;