import { chartSlice } from "@/redux/slice/chartSlice";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const fetchData = async (user, dispatch, setChartData) => {
  const data = await fetcher(`/api/chart?email=${user?.email}`);
  if (data.user.files) {
    dispatch(setChartData(data.user.files));
  }
};

export const postFile = async (user, title, files) => {
  try {
    const data = await fetch("/api/chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        title: title,
        files: [files],
      }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const putFile = async (user, file) => {
  try {
    const data = await fetch(`/api/chart/${file.idFile}?email=${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: file.idFile,
        fileName: file.fileName,
        chart: file.chart,
      }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (user, id) => {
  try {
    const data = await fetch(`/api/chart/${id}?email=${user.email}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
