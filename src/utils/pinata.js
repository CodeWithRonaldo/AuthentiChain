const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

export const uploadToPinata = async (fileOrBlob) => {
  if (!PINATA_JWT) {
    throw new Error("Pinata JWT is missing. Please add it to src/utils/pinata.js");
  }

  const formData = new FormData();
  formData.append('file', fileOrBlob);

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  };

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options);
    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns { IpfsHash: string, PinSize: number, Timestamp: string }
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw error;
  }
};

export const uploadMetadataToPinata = async (name, description, imageUri, attributes) => {
  if (!PINATA_JWT) {
    throw new Error("Pinata JWT is missing. Please add it to src/utils/pinata.js");
  }

  const metadata = {
    name: name,
    description: description,
    image: imageUri,
    attributes: attributes,
    properties: {
      files: [
        {
          type: "image/png",
          uri: imageUri,
        },
      ],
    },
  };

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: {
        name: `${name.replace(/\s+/g, '-')}-metadata.json`,
      },
    }),
  };

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options);
    if (!response.ok) {
      throw new Error(`Pinata metadata upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns { IpfsHash: string, ... }
  } catch (error) {
    console.error("Error uploading metadata to Pinata:", error);
    throw error;
  }
};
