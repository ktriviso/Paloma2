import { useQuery } from 'react-query'
import axios from "axios";

export default function Home() {
  const { data } = useQuery('api/content', () => axios("http://127.0.0.1:5000/api/content").then((res) => res.data))

  return (
    <ul>
      {data.entries.map(item => (
        <li>{item.title}</li>
      ))}
    </ul>
  )
}
