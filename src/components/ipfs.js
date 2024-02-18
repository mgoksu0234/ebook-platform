import { Web3Storage } from "web3.storage";

const apiToken = process.env.REACT_APP_WEB3STORAGE_API_KEY;

export const client = new Web3Storage({
  token: apiToken,
});

export const generateCidUrl = (cid, filename) => {
  return `https://${cid}.ipfs.w3s.link/${filename}`;
};

export const uploadFile = async (file) => {
  const cid = await client.put([file]);

  const url = generateCidUrl(cid, file.name);

  return { cid, url };
};

export const createMetadata = async (name, publisher, fileUrl) => {
  const metadata = JSON.stringify({ name, publisher, fileUrl });
  console.log("metadata", metadata, fileUrl);
  const metadatafile = new File([metadata], "metadata.json", {
    type: "text/plain",
  });
  return uploadFile(metadatafile);
};
