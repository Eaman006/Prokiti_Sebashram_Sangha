import ManageStories from "@/app/components/ManageStories";

export default function AdminManageStoriesPage() {
  return (
    <div className="rounded-2xl shadow-purple-300 shadow-lg p-4 md:p-6 m-2 bg-white">
      <div className="mb-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-purple-600 mb-2">
          Manage Stories
        </h1>
        <p className="text-gray-500 font-medium">
          View and manage published stories. Deleting a story removes it from the "Stories from the Ground" section on the home page.
        </p>
      </div>

      <ManageStories />
    </div>
  );
}
