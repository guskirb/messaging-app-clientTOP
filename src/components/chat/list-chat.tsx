
export default function ListChat({ messages, isLoading }) {
  console.log(messages);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div>list-chat</div>;
}
