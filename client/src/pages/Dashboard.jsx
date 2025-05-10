import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2 className="dashboard-title">Welcome to the Dashboard</h2>
          <div className="row mt-4">
            <div
              className="col-md-6 mb-4"
              onClick={() => navigate("/create-event")}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Create Event</h5>
                  <p className="card-text">
                    Organize a new event by providing all the details.
                  </p>
                </div>
              </div>
            </div>

            {/* View Events Card */}
            <div
              className="col-md-6 mb-4"
              onClick={() => navigate("/view-events")}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">View Events</h5>
                  <p className="card-text">
                    Browse and register for events in your city.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
