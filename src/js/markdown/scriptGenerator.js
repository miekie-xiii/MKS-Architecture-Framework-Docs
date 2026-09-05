export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }

  return response.text();
}

export function generateScript(template, config) {
  const variables = {
    rnX: config.reviveTeamSwitchX,
    rnY: config.reviveTeamSwitchY,
    rnZ: config.reviveTeamSwitchZ,
    mgnX: config.minigunX,
    mgnY: config.minigunY,
    mgnZ: config.minigunZ,
    slmX: config.slimerX,
    slmY: config.slimerY,
    slmZ: config.slimerZ,
    wmnX: config.warMachineX,
    wmnY: config.warMachineY,
    wmnZ: config.warMachineZ,
    bltX: config.buildToolX,
    bltY: config.buildToolY,
    bltZ: config.buildToolZ
  };

  let output = template;

  Object.entries(variables).forEach(([variable, value]) => {
    const regex = new RegExp(`(num\\s+${variable}=)[^;]+`, "g");
    output = output.replace(regex, `$1${value}`);
  });

  return output;
}