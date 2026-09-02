export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }

  return response.text();
}

export function generateScript(template, config) {
  const replacements = {
    "{{REVIVE_TEAM_SWITCH_X}}": config.reviveTeamSwitchX,
    "{{REVIVE_TEAM_SWITCH_Y}}": config.reviveTeamSwitchY,
    "{{REVIVE_TEAM_SWITCH_Z}}": config.reviveTeamSwitchZ,
    "{{MINIGUN_X}}": config.minigunX,
    "{{MINIGUN_Y}}": config.minigunY,
    "{{MINIGUN_Z}}": config.minigunZ,
    "{{SLIMER_X}}": config.slimerX,
    "{{SLIMER_Y}}": config.slimerY,
    "{{SLIMER_Z}}": config.slimerZ,
    "{{WAR_MACHINE_X}}": config.warMachineX,
    "{{WAR_MACHINE_Y}}": config.warMachineY,
    "{{WAR_MACHINE_Z}}": config.warMachineZ,
    "{{BUILD_TOOL_X}}": config.buildToolX,
    "{{BUILD_TOOL_Y}}": config.buildToolY,
    "{{BUILD_TOOL_Z}}": config.buildToolZ
  };

  let output = template;

  Object.entries(replacements).forEach(([placeholder, value]) => {
    output = output.replaceAll(placeholder, String(value));
  });

  return output;
}