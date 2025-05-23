import { Metadata, LinkForm } from "@/components";
import { BACKEND, BACKEND_API } from "@/config";
import { useRouter } from 'next/router';

export default function CreateLink({ all_folders }) {
  const router = useRouter()
  const { parent } = router.query

  const handleSubmit = async (data) => {
    const res = await fetch(BACKEND_API + "/blog/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      const { folder } = await res.json();
      document.location.href = `/blog/f/${folder}`;
    }
  }

  return (
    <>
      <Metadata title="Create Link" />
      <h1>Create Link</h1>
      <LinkForm content={{ folder: parent }} all_folders={all_folders} handleSubmit={handleSubmit} />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(BACKEND + "/blog/folders")
  const all_folders = await res.json()

  return {
    props: {
      all_folders
    }
  }
}
