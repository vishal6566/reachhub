import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../utils/functionsAndimage";
import SkeletonLoading from "../components/SkeletonLoading";
const HomePage = () => {
  const [topPlayers, setTopPlayers] = useState([]);
  const [download, setDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fetchTopPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/top-players`);
      setTopPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top players:", error);
    }
  };

  const downloadCsvFile = async () => {
    try {
      setDownload(true);
      const response = await axios.get(`${API}/players/rating-history-csv`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rating-history.csv");
      document.body.appendChild(link);
      link.click();
      toast({
        title: "Download File Successfully",
        description: "You file is downloaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setDownload(false);
    } catch (error) {
      console.error("Error downloading CSV file:", error);
    }
  };

  useEffect(() => {
    fetchTopPlayers();
  }, []);

  return (
    <Box>
      <Button onClick={downloadCsvFile}>
        {download ? "Downloading..." : "Download Rating-History Csv file"}
      </Button>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption> top 50 chess players</TableCaption>
            <Thead>
              <Tr>
                <Th>S.No.</Th>
                <Th>Name</Th>
                <Th>Rating</Th>
                <Th>Progress</Th>
                <Th>Rating History</Th>
              </Tr>
            </Thead>
            <Tbody>
              {topPlayers &&
                topPlayers.map((player, i) => (
                  <Tr key={player._id}>
                    <Td
                      borderLeft={"1px solid gray"}
                      borderRight={"1px solid gray"}
                    >
                      {i + 1}
                    </Td>
                    <Td borderRight={"1px solid gray"}>{player.username}</Td>
                    <Td borderRight={"1px solid gray"}>
                      {player.perfs.classical.rating}
                    </Td>
                    <Td borderRight={"1px solid gray"}>
                      {player.perfs.classical.progress}
                    </Td>
                    <Link to={`/players/${player.username}`}>
                      {" "}
                      <Td
                        borderRight={"1px solid gray"}
                        color={"blue"}
                        cursor={"pointer"}
                      >
                        Click here
                      </Td>
                    </Link>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default HomePage;
