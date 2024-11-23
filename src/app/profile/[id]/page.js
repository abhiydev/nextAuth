export default async function UserProfile({ params }) {
  const { id } = await params; // Await the params object in RSC context

  return (
    <div>
      <h1>Profile</h1>
      <br />
      <p className="text-2xl">
        This is a profile page
        <span className="p-2 bg-blue-600">{id}</span>
      </p>
    </div>
  );
}
