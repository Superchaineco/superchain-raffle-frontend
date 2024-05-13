import { Card } from "@mui/material";

type ProfileInfoCardProps = {
  primary: string;
  secondary: number;
};

function ProfileInfoCard({primary, secondary}: ProfileInfoCardProps) {
  return (
    <Card>
      <h4>{primary}</h4>
      <h4>{secondary}</h4>
    </Card>
  );
}

export { ProfileInfoCard };
