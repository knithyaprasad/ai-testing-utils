import { useCounter } from '@/hooks/useCounter'

export default function Home() {
  const { count, increment } = useCounter()
  return <button onClick={increment}>Count: {count}</button>
}
