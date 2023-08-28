import React, { useState, useEffect } from "react";
import Axios from "axios";

import Navbar from "../../components/Navbar";
import LeaderBoardBackground from "../../assets/images/leaderBoard.jpg";
import first from "../../assets/images/first.png";
import second from "../../assets/images/second.png";
import third from "../../assets/images/third.png";
import backendUrl from "../../constants";
import LoadingComponent from "../../components/loadingComponent";

const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const getLeaderboardData = async () => {
      try {
        const res = await Axios.get(`${backendUrl}/leaderboard`);
        console.log(res.data);
        setLeaderboardData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getLeaderboardData();
  }, []);

  return (
    <>
      <Navbar bg="black" />
      <div
        style={{
          backgroundColor: "black",
          backgroundImage: `url(${LeaderBoardBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "90vh",
        }}
        // className="min-vh-100"
      >
        <h1 className="mb-3">Leaderboard</h1>

        <div className="container">
          <div className="row">
            <div className="col-xl-9  col-md-8 mx-auto mt-4">
              <div className="card bg-dark">
                <div className="card-body" style={{ minHeight: "50vh" }}>
                  {isLoading ? (
                    <LoadingComponent lSize="30px" />
                  ) : (
                    <table className="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Rank</th>
                          <th scope="col">UserName</th>
                          <th scope="col">No of Hints contributed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">
                                {index == 0 ? (
                                  <img src={first} alt="first" width={"25px"} />
                                ) : index == 1 ? (
                                  <img
                                    src={second}
                                    alt="second"
                                    width={"25px"}
                                  />
                                ) : index == 2 ? (
                                  <img src={third} alt="third" width={"25px"} />
                                ) : (
                                  index + 1
                                )}
                              </th>
                              <td>{item.username}</td>
                              <td>{item.num_hints}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
