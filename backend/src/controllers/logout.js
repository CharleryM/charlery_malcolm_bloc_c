export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false // true en HTTPS
    });

    res.json({ message: "Déconnexion réussie" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
