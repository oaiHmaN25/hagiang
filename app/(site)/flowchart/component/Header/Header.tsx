"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import "react-edit-text/dist/index.css";
import { EditText } from "react-edit-text";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { chartSlice } from "@/redux/slice/chartSlice";

interface RootState {
  chart: {
    flowFunc: any;
    chartData: any[];
    currentFile: number;
  };
}

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
const { setChartData, setCurrentFile } = chartSlice.actions;

export default function Header() {
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const chartData = useSelector((state: RootState) => state.chart.chartData);
  const flowFunc = useSelector((state: RootState) => state.chart.flowFunc);

  const { user, error, isLoading } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetcher(`/api/chart?email=${user?.email}`);
      if (data.user.files) {
        dispatch(setChartData(data.user.files));
      }
    };
    fetchData();
  }, [user]);
  useEffect(() => {
    if (chartData.length > 0) {
      const nodes = chartData[currentFileIndex].chart.nodes;
      const edges = chartData[currentFileIndex].chart.edges;
      if (flowFunc) flowFunc.setNodes(nodes);
      flowFunc.setEdges(edges);
    }
  }, [chartData, currentFileIndex]);
  return (
    <>
      <div className="flex w-full items-center gap-3">
        <Button color="primary" variant="bordered">
          New
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Files</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {chartData.map((item, index) => (
              <DropdownItem
                key={item._id}
                onClick={() => {
                  setCurrentFileIndex(index);
                  dispatch(setCurrentFile(item));
                }}
              >
                {item.fileName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex w-full items-center justify-between">
        <EditText
          defaultValue={
            chartData[currentFileIndex]
              ? chartData[currentFileIndex].fileName
              : "Untitled"
          }
          onSave={({ value }) => {
            const newChartData = [...chartData];
            newChartData[currentFileIndex] = {
              ...newChartData[currentFileIndex],
              fileName: value,
            };
            dispatch(setChartData(newChartData));
          }}
          style={{
            outline: "none",
            width: "200px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        />
        <Button
          color="primary"
          variant="bordered"
          className="rounded-md border border-sky-500 px-5 py-1"
        >
          Share
        </Button>
      </div>
    </>
  );
}
