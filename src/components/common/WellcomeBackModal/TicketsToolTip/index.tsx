import Typography from "@mui/material/Typography";
import { Divider, Stack, SvgIcon } from "@mui/material";
import TicketsIcon from "@/public/images/tickets-icon-blue.svg";

type Props = {
  opTickets: number[];
  baseTickets: number[];
};

function WellcomeBackModalTicketsToolTip({ opTickets, baseTickets }: Props) {
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
          {opTickets.map((ticket, index) => (
            <Stack
              key={index}
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
              <Typography variant="body2">{ticket}</Typography>
            </Stack>
          ))}
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
        {baseTickets.map((ticket, index) => (
          <Stack
            key={index}
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
            <Typography variant="body2">{ticket}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default WellcomeBackModalTicketsToolTip;
