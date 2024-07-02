export async function getMyLeaderBoardInfo() {
  const res = await fetch("/api/getMyLeaderBoardInfo");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}

export async function getLeaderBoardData() {
  const res = await fetch("/api/getLeaderBoardData");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}

export async function getRaffleCardsData() {
  const res = await fetch("/api/getRaffleCardsData");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}

export async function getProfileData() {
  const res = await fetch("/api/getProfileData");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}

export async function getMyRewardsData() {
  const res = await fetch("/api/getMyRewardsData");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}

export async function getWelcomeBackData() {
  const res = await fetch("/api/getWelcomeBackData");
  if (!res.ok) {
    throw new Error("Failed to get my LeaderBoard info profile");
  }
  return res.json();
}