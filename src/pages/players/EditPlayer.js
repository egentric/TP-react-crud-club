import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const EditPlayer = () => {
  const { player } = useParams();
  const navigate = useNavigate();
  const [firstNamePlayer, setFirstNamePlayer] = useState("");
  const [lastNamePlayer, setLastNamePlayer] = useState("");
  const [heightPlayer, setHeightPlayer] = useState("");
  const [positionPlayer, setPositionPlayer] = useState("");
  const [club_id, setClubId] = useState("");
  const [photoPlayer, setPhotoPlayer] = useState(null);
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getPlayer();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getPlayer = async () => {
    await axios
      .get(`http://localhost:8000/api/players/${player}`)
      .then((res) => {
        console.log(res.data);
        setFirstNamePlayer(res.data.firstNamePlayer);
        setLastNamePlayer(res.data.lastNamePlayer);
        setHeightPlayer(res.data.heightPlayer);
        setPositionPlayer(res.data.positionPlayer);
        setClubId(res.data.club_id);
        setPhotoPlayer(res.data.photoPlayer);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (event) => {
    setPhotoPlayer(event.target.files[0]);
  };
  //Fonction d'ajout de player
  const updatePlayer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("firstNamePlayer", firstNamePlayer);
    formData.append("lastNamePlayer", lastNamePlayer);
    formData.append("heightPlayer", heightPlayer);
    formData.append("positionPlayer", positionPlayer);
    formData.append("club_id", club_id);
    formData.append("photoPlayer", photoPlayer);
    if (photoPlayer !== null) {
      formData.append("photoPlayer", photoPlayer);
    }
    await axios
      .post(`http://localhost:8000/api/playerss/${player}`, formData)
      .then(navigate("/players"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un joueur</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={updatePlayer}>
                    <Row>
                      <Col>
                        <Form.Group controlId="FirstName">
                          <Form.Label>Prénom du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={firstNamePlayer}
                            onChange={(event) => {
                              setFirstNamePlayer(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="LastName">
                          <Form.Label>Nom du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={lastNamePlayer}
                            onChange={(event) => {
                              setLastNamePlayer(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Height">
                          <Form.Label>Taille du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={heightPlayer}
                            onChange={(event) => {
                              setHeightPlayer(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId="Position">
                          <Form.Label>Poste du joueur</Form.Label>
                          <Form.Control
                            type="text"
                            value={positionPlayer}
                            onChange={(event) => {
                              setPositionPlayer(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="PhotoPlayer" className="mb-3">
                          <Form.Label>photo</Form.Label>
                          <Form.Control type="file" onChange={changeHandler} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default <EditPlayer></EditPlayer>;
