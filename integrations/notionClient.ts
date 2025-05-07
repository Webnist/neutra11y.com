export const getNotionPageTitle = async (pageId: string) => {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_TOKEN}`,
      "Notion-Version": "2022-06-28",
    },
  });
  const data = await res.json();
  return data?.properties?.title?.title?.[0]?.plain_text ?? "Untitled";
};
