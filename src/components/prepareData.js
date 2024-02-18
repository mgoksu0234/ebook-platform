import React from "react";

const hexToDecimal = (hex) => parseInt(hex, 16);

// Getting All Books General Function
export const prepareBookData = (data) => {
  const allBooks = [];
  if (data.length == 0) {
    return allBooks;
  }
  for (let i = 0; i < data.length; i++) {
    let tempData = {
      nft: data[i].nft,
      publisherAddress: data[i].publisherAddress,
      totalSupply: hexToDecimal(data[i].totalSupply._hex),
      mintCount: hexToDecimal(data[i].mintCount._hex),
      isActive: data[i].isActive,
      incomePercentage: hexToDecimal(data[i].incomePercentage._hex),
      status: data[i].status,
    };
    allBooks.push(tempData);
  }
  return allBooks;
};
export const preparePublisherData = (data) => {
  const allPublishers = [];
  if (data.length == 0) {
    return allPublishers;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].wallet !== "0x0000000000000000000000000000000000000000") {
      let tempData = {
        name: data[i].name,
        wallet: data[i].wallet,
      };
      allPublishers.push(tempData);
    }
  }
  return allPublishers;
};
export const getPublisherBooks = (data, address) => {
  const publisherBooks = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].publisherAddress == address) {
      publisherBooks.push(data[i]);
    }
  }
  return publisherBooks;
};
export const getTotalGenerated = (data) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].totalSupply;
  }
  return total;
};
export const getTotalMint = (data) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].mintCount;
  }
  return total;
};

export const getTotalApproved = (data) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 1) {
      total++;
    }
  }
  return total;
};
export const sortAndReturnTopThree = (objects, key) => {
  // Sort the objects array based on the specified key
  objects.sort(function (a, b) {
    return b[key] - a[key];
  });

  // Return the top three objects
  return objects.slice(0, 3);
};
export const getWaitingBooks = (data) => {
  const waitingBooks = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 0) {
      waitingBooks.push(data[i]);
    }
  }
  return waitingBooks;
};
export const getApprovedBooks = (data) => {
  const approvedBooks = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 1) {
      approvedBooks.push(data[i]);
    }
  }
  return approvedBooks;
};
export const getRejectedBooks = (data) => {
  const rejectedBooks = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 2) {
      rejectedBooks.push(data[i]);
    }
  }
  return rejectedBooks;
};
export const getAllPublishers = (data) => {
  const allPublishers = [];
  for (let i = 0; i < data.length; i++) {
    let tempData = {
      name: data[i].name,
      wallet: data[i].wallet,
    };
    allPublishers.push(tempData);
  }
  console.log(allPublishers);
  return allPublishers;
};
export const getPublisherName = (allPublishers, address) => {
  let publisherName;
  for (let i = 0; i < allPublishers.length; i++) {
    if (allPublishers[i].wallet == address) {
      publisherName = allPublishers[i].name;
    }
  }
  return publisherName;
};

export const fetchDetailOfBook = async (data) => {
  try {
    let response = await fetch(data);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const getBookDetail = async (data) => {
  const bookDetail = await fetchDetailOfBook(data);
  return bookDetail;
};
