import Typography from "@mui/material/Typography";
import { Divider, Stack, SvgIcon } from "@mui/material";
import TicketsIcon from "@/public/images/tickets-icon-blue.svg";

function WellcomeBackModalTicketsToolTip() {
  return (
    <Stack p={1} spacing={2} direction={"column"}>
      <Stack
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
      >
        <Typography variant="body2">48 Hour OP Raffle</Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={0.5}
          >
            <SvgIcon
              component={TicketsIcon}
              inheritViewBox
              style={{ width: "20px", height: "20px" }}
            />
            <Typography variant="body2">6</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={0.5}
          >
            <SvgIcon
              component={TicketsIcon}
              inheritViewBox
              style={{ width: "20px", height: "20px" }}
            />
            <Typography variant="body2">24</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Stack
        direction={"column"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <Typography variant="body2">48 Hour Base Raffle</Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={0.5}
        >
          <SvgIcon
            component={TicketsIcon}
            inheritViewBox
            style={{ width: "20px", height: "20px" }}
          />
          <Typography variant="body2">46</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default WellcomeBackModalTicketsToolTip;
