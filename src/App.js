
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])
  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')

  const [postDataa, setPostData] = useState({
    title: '',
    body: '',
  })



  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        // console.log("geeting from :: ::",res.data)
        setData(res.data)
      }).catch(err => console.log(err))
  }, [])

  const postData = (e) => {
    e.preventDefault()
    axios.post('https://jsonplaceholder.typicode.com/posts', postDataa)
    .then((res) => {
      console.log(res)
    }).catch(err => console.log(err))
  }

  const postDelete = (id, e) => {
    e.preventDefault();
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => console.log('deleted !!!!',res))
      .catch(err => console.log(err))
  }

  const onChangeData = (e) => {
    setPostData((prev) => {
      return {
        ...postDataa,
        [e.target.name]: e.target.value
      }
    })
  }






  const arr = data.map((data, index) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.title}</td>
        <td>{data.body}</td>
        <td>< button onClick={(e) => postDelete(data.id, e)}>Delete</button></td>

      </tr>
    )
  })

  return (
    <div className='App'>
      <h1>lets use axio from react js</h1>

      <form>
        <label>Title</label>
        <input type='text' value={postDataa.title} name='title' onChange={onChangeData} />
        <hr />
        <label>Body</label>
        <input type='text' value={postDataa.body} name='body' onChange={onChangeData} />
        <hr />
        <button onClick={postData}>Post</button>
      </form>

      <table border={1}>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
        {arr}

      </table>


    </div>
  );
}

export default App;
