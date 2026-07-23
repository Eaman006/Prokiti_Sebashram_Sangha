import StoryUploadForm from "../components/StoryUploadForm";

export default function AdminUploadStoriesPage() {
  return (
    <div className="rounded-2xl shadow-purple-300 shadow-lg p-4 md:p-6 m-2">
      <h1 className="font-extrabold text-3xl md:text-4xl text-purple-600 mb-2">
        Upload Stories
      </h1>
      <p className="text-gray-500 font-medium mb-6">
        Upload photos with a caption and location. New posts appear in Stories from the Ground on the home page.
      </p>

      <StoryUploadForm />
    </div>
  );
}
