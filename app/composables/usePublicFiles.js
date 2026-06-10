// Help to lazy load the public folder jsons or assets
export async function usePublicFiles(publicDirUrl) {
  try {
    const res = await fetch(publicDirUrl);
    return await res.json();
  } catch (error) {
    // console.log(error);
    return null;
  }
}
