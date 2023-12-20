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
import { v4 as uuidv4 } from "uuid";
import {
  deleteFile,
  fetchData,
  postFile,
  putFile,
} from "@/app/service/servicesApi";
import { chartSlice } from "@/redux/slice/chartSlice";
import Image from "next/image";
interface RootState {
  chart: {
    flowFunc: any;
    chartData: any[];
    currentFile: number;
  };
}

const { setChartData, setCurrentFile } = chartSlice.actions;

export default function Header() {
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const chartData = useSelector((state: RootState) => state.chart.chartData);
  const flowFunc = useSelector((state: RootState) => state.chart.flowFunc);

  const { user, error, isLoading } = useUser();
  useEffect(() => {
    fetchData(user, dispatch, setChartData);
  }, [user]);
  useEffect(() => {
    if (chartData.length > 0) {
      const nodes = chartData[currentFileIndex].chart.nodes;
      const edges = chartData[currentFileIndex].chart.edges;
      if (flowFunc) flowFunc.setNodes(nodes);
      flowFunc.setEdges(edges);
    }
  }, [chartData, currentFileIndex]);

  const handleNewFile = async () => {
    const newChartData = [...chartData];
    const newFile = {
      idFile: uuidv4(),
      fileName: "Untitled File",
      chart: {
        nodes: [],
        edges: [],
      },
    };
    newChartData.push(newFile);
    dispatch(setChartData(newChartData));
    setCurrentFileIndex(newChartData.length - 1);
    dispatch(setCurrentFile(newChartData.length - 1));
    const data = await postFile(user, newFile.fileName, newFile);
  };

  const handleDeleteFile = async () => {
    const newChartData = [...chartData];
    newChartData.splice(currentFileIndex, 1);
    dispatch(setChartData(newChartData));
    setCurrentFileIndex(0);
    dispatch(setCurrentFile(0));
    const data = await deleteFile(user, chartData[currentFileIndex]._id);
  };
  return (
    <>
      <div className="flex w-full items-center gap-3">
        <Button color="primary" variant="bordered" onClick={handleNewFile}>
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
                  dispatch(setCurrentFile(index));
                }}
                isReadOnly
                endContent={
                  <Image
                    src="/images/flow-chart/trash-bin.png"
                    alt="Bin"
                    width={20}
                    height={20}
                    onClick={handleDeleteFile}
                  />
                }
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
            const chartDataCopy = JSON.parse(JSON.stringify(chartData));
            chartDataCopy[currentFileIndex].fileName = value;
            putFile(user, chartDataCopy[currentFileIndex]);
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
