import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../utils/functionsAndimage";
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
} from "@chakra-ui/react";
import axios from "axios";
import SkeletonLoading from "../components/SkeletonLoading";
const SinglePlayerPage = () => {
  const { username } = useParams();
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTopPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/player/${username}/rating-history`
      );
      setTopPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top players:", error);
    }
  };
  useEffect(() => {
    fetchTopPlayers();
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption> Rating Points</TableCaption>
          <Thead>
            <Tr>
              <Th>S.No.</Th>
              <Th>Date</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <SkeletonLoading />
            ) : (
              topPlayers &&
              topPlayers.map((player, i) => (
                <Tr key={i + 1}>
                  <Td
                    borderLeft={"1px solid gray"}
                    borderRight={"1px solid gray"}
                  >
                    {i + 1}
                  </Td>
                  <Td borderRight={"1px solid gray"}>{player.date}</Td>
                  <Td borderRight={"1px solid gray"}>{player.points}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SinglePlayerPage;
