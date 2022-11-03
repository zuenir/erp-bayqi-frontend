// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";

// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------
import { connect, useDispatch } from "react-redux";
import {
  getCurrentProfile,
  getAllUsersProfiles,
} from "../redux/profile/profileAction";
import {
  getAllCompanys,
  getAllCompanysByProfileId,
} from "../redux/company/companyAction";
import { getAllCompanyCategorys } from "../redux/companyCategory/categoryAction";
import {
  getAllClockings,
  getAllClockingsByProfileId,
} from "../redux/clocking/clockingAction";
import { getAllAdvertisingCompany } from './../redux/advertising/advertisingAction';
import { getAllAdvertisingPackage } from "../redux/advertisingPackage/advertisingPackageAction";
import { getReports } from "../redux/service/serviceAction";
import { loadUser } from "../redux/auth/authAction";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { auth_actions } from "../redux/auth/authSlice";
import { profile_actions } from "../redux/profile/profileSlice";
import { useNavigate } from "react-router-dom";

import moment from 'moment/dist/moment';
import 'moment/dist/locale/pt-br';

const getDate = (valor) => {
  if (valor !== "") {
    let newValor = moment(valor).format("DD/MM/YYYY");
    let result = newValor.split("/").map((res) => res.trim());
    return `${result[1]}/${result[2]}`;
  } else {
    let result = "";
    return result;
  }
};

const DashboardApp = ({
  loadUser,
  getAllUsersProfiles,
  getCurrentProfile,
  getAllCompanys,
  getAllCompanysByProfileId,
  getAllCompanyCategorys,
  getAllClockings,
  getAllClockingsByProfileId,
  getAllAdvertisingCompany,
  getAllAdvertisingPackage,
  getReports,
  auth: { roles },
  profile: {profile},
  company: {
    companys,
    companyCountActive,
    companyCountPending,
    companyCountCanceled,
  }
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_KEY = "728c3d4defa1f9faf41dbd19474ac5ae";

  useEffect(() => {
    //Logout
    if (localStorage.getItem("bayqi_erp_loginlogout") === "sair") {
      dispatch(auth_actions());
      dispatch(profile_actions());
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    
    async function fetchData() {
      try {
        await getCurrentProfile().then(async (result) => {
          if (result.payload._id) {
            if (roles === 2001 || roles === 2055) {
              await getAllCompanysByProfileId(result.payload._id);
              await getAllClockingsByProfileId(result.payload._id);
            }else  if (roles === 5150 || roles === 1984 || roles === 1990) {
              await getAllUsersProfiles();
              await getAllClockings();
              await getAllCompanys();
              await getAllCompanyCategorys();
              await getReports();
            }
          }
        });
       
        await getAllAdvertisingCompany();
        await getAllAdvertisingPackage();
        
      } catch (error) {
        console.log("Server Error", error);
      }
    }

    fetchData();
  }, [
    loadUser,
    getCurrentProfile,
    getAllCompanyCategorys,
    getAllUsersProfiles,
    getAllCompanys,
    getAllClockings,
    roles,
    getAllCompanysByProfileId,
    getAllClockingsByProfileId,
    getAllAdvertisingCompany,
    getAllAdvertisingPackage,
    getReports,
  ]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          getCoordinates,
          handleErrorCoordinates
        );
      } else {
        alert("geolocation");
      }
    };

    const getCoordinates = (position) => {
      reverseGeoCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
    };

    const reverseGeoCoordinates = (latitude, longitude) => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem("bayqi_erp_location", data[0].local_names.pt)
        );
    };

    const handleErrorCoordinates = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
        default:
          alert("An unknown error occurred.");
      }
    };
    getLocation();
  }, []);

  const countCompany = (mesInicial,status) => {
    return companys.filter((company) => company.status === status && getDate(company.date) === mesInicial).length;
  }

  const getAllCompanyCountStatus = (status) =>  {
    var companysActivo = [];
    var correntYear =  moment().format("YYYY");
    var mesInicial  = 0
    for(let i = 1; i <= 12; i++){
      mesInicial = i < 10 ? `0${i}/${correntYear}` : `${i}/${correntYear}`;
      companysActivo.push(countCompany(mesInicial,status))
    }

    return companysActivo;
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Olá, Bem-Vindo(a)
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="BayQi Ponto"
              total={companys.filter((company) => company.company_activity === "BayQi Ponto").length}
              icon={"clarity:store-solid"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="BayQi Marketplace"
              total={companys.filter((company) => company.company_activity === "BayQi Marketplace").length}
              color="warning"
              icon={"icon-park-twotone:weixin-market"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="BayQi Publicidade"
              total={companys.filter((company) => company.company_activity === "BayQi Publicidade").length}
              color="error"
              icon={"icons8:advertising"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Parceiros"
              total={companys.length}
              color="info"
              icon={"bxs:business"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title={`Balanço Anual ${moment().format("YYYY")}`}
              subheader="..."
              chartLabels={[
                `01/01/${moment().format("YYYY")}`,
                `02/01/${moment().format("YYYY")}`,
                `03/01/${moment().format("YYYY")}`,
                `04/01/${moment().format("YYYY")}`,
                `05/01/${moment().format("YYYY")}`,
                `06/01/${moment().format("YYYY")}`,
                `07/01/${moment().format("YYYY")}`,
                `08/01/${moment().format("YYYY")}`,
                `09/01/${moment().format("YYYY")}`,
                `10/01/${moment().format("YYYY")}`,
                `11/01/${moment().format("YYYY")}`,
                `12/01/${moment().format("YYYY")}`,
              ]}
              chartData={[
                {
                  name: "Fechado",
                  type: "column",
                  fill: "solid",
                  color: "#1E90FF",
                  data: getAllCompanyCountStatus("Fechado"),
                },
                {
                  name: "Aberto",
                  type: "area",
                  fill: "gradient",
                  data: getAllCompanyCountStatus("Aberto"),
                },
                {
                  name: "Cancelado",
                  type: "pie",
                  fill: "solid",
                  color: "#FF7F50",
                  data: getAllCompanyCountStatus("Cancelado"),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Parceiros"
              chartData={[
                { label: "Aberto", value: companyCountPending },
                { label: "Fechado", value: companyCountActive },
                { label: "Cancelado", value: companyCountCanceled },
              ]}
              chartColors={[
                theme.palette.chart.yellow[0],
                theme.palette.chart.blue[0],
                theme.palette.chart.red[0],
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

DashboardApp.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getAllCompanyCategorys: PropTypes.func.isRequired,
  getAllUsersProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getAllCompanys: PropTypes.func.isRequired,
  getAllCompanysByProfileId: PropTypes.func.isRequired,
  getAllClockings: PropTypes.func.isRequired,
  getAllClockingsByProfileId: PropTypes.func.isRequired,
  getReports: PropTypes.func.isRequired,
  getAllAdvertisingPackage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  company: state.company
});

export default connect(mapStateToProps, {
  loadUser,
  getCurrentProfile,
  getAllCompanys,
  getAllCompanysByProfileId,
  getAllUsersProfiles,
  getAllCompanyCategorys,
  getAllClockings,
  getAllClockingsByProfileId,
  getAllAdvertisingPackage,
  getAllAdvertisingCompany,
  getReports
})(DashboardApp);
