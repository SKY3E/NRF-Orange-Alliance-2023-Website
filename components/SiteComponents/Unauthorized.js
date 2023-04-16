export default function Unauthorized() {
  return (
    <section className="ml-4 lg:ml-64 mt-20 mr-4">
      <div className="bg-black rounded p-4 items-center">
        <h1 className="text-white">Unauthorized</h1>
        <p className="text-white">Please login and request access if you haven't.</p>
      </div>
    </section>
  );
}
