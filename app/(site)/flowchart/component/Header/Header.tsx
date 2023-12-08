"use client";
import useSWR from "swr";
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
import { useEdgesState, useNodesState } from "reactflow";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Header() {
  const [nodes, setNodes] = useNodesState();
  const [edges, setEdges] = useEdgesState();
  const [data, setData] = useState([]);
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/chart?email=${user?.email}`, fetcher);
      const data = await response.json();
      if (data.user.files) {
        setData(data.user.files);
      }
    };
    fetchData();
  }, [user]);
  useEffect(() => {
    console.log(data);
    if (data.length > 0) {
      const nodes = data[0].chart.nodes;
      const edges = data[0].chart.edges;
      setNodes(nodes);
      setEdges(edges);
    }
  }, [data]);
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
            {data.map((item) => (
              <DropdownItem key={item._id}>{item.fileName}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex w-full items-center justify-between">
        <EditText
          defaultValue="Untitled Flowchart"
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
