"""Generates flat merchandise illustrations (400x400) for the IKA PBI UII store."""
import pathlib, sys

OUT = pathlib.Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)

INK = "#16231F"; PAPER = "#F4F0E6"; OAT = "#D9CFBC"; TERRA = "#B8451A"
FOREST = "#2F4A40"; STRIPE = "#E9DFC9"; CANVAS = "#EDE3CF"
FONT = "font-family=\"'Helvetica Neue', Arial, sans-serif\" font-weight=\"800\""
S = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'

def shade(hex_, f):
    h = hex_.lstrip("#"); r, g, b = (int(h[i:i+2], 16) for i in (0, 2, 4))
    return "#%02x%02x%02x" % tuple(max(0, min(255, int(c * f))) for c in (r, g, b))

def logo(x, y, s, fill=TERRA, dots=PAPER):
    return (f'<g transform="translate({x} {y}) scale({s}) translate(-16 -16)">'
            f'<path d="M16 3C8.82 3 3 8.37 3 15c0 3.3 1.44 6.29 3.78 8.46L5.5 29l6.06-2.73c1.39.47 2.88.73 4.44.73 7.18 0 13-5.37 13-12S23.18 3 16 3Z" fill="{fill}"/>'
            f'<circle cx="11" cy="15" r="1.8" fill="{dots}"/><circle cx="16" cy="15" r="1.8" fill="{dots}"/><circle cx="21" cy="15" r="1.8" fill="{dots}"/></g>')

def svg(body, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="{label}">'
            f'<ellipse cx="200" cy="356" rx="130" ry="10" fill="{INK}" opacity="0.08"/>{body}</svg>\n')

TEE = "M150 78 L112 92 L62 134 L92 182 L122 166 L122 336 L278 336 L278 166 L308 182 L338 134 L288 92 L250 78 C240 104 160 104 150 78 Z"
LONG = ("M150 78 L110 92 C88 102 80 124 76 150 L60 312 L100 318 L122 180 L122 336 L278 336 L278 180 "
        "L300 318 L340 312 L324 150 C320 124 312 102 290 92 L250 78 C240 104 160 104 150 78 Z")
CUFFS = "M60 312 L100 318 L98 334 L58 328 Z M340 312 L300 318 L302 334 L342 328 Z"
HEM = "M122 318 L278 318 L278 336 L122 336 Z"
NECK = "M150 78 C165 92 235 92 250 78 C240 104 160 104 150 78 Z"

def tee(color, print_):
    return (f'<path d="{TEE}" fill="{color}" {S}/>'
            f'<path d="{NECK}" fill="{shade(color, .82)}" {S}/>'
            f'<path d="M92 182 L122 166 M308 182 L278 166" {S} fill="none" opacity=".5"/>' + print_)

def longsleeve(color, sleeve=None, rib=None):
    rib = rib or shade(color, .85)
    sl = sleeve or color
    out = f'<path d="{LONG}" fill="{sl}" {S}/>'
    if sleeve:
        out += f'<path d="M150 78 L122 92 L122 336 L278 336 L278 92 L250 78 C240 104 160 104 150 78 Z" fill="{color}" {S}/>'
    out += f'<path d="{CUFFS}" fill="{rib}" {S}/><path d="{HEM}" fill="{rib}" {S}/>'
    out += f'<path d="M122 180 L122 318 M278 180 L278 318" {S} fill="none" opacity=".35"/>'
    return out

items = {}

# Hats
cap_c = INK
items["cap"] = svg(
    f'<path d="M88 236 C88 150 140 112 200 112 C260 112 312 150 312 236 Z" fill="{cap_c}" {S}/>'
    f'<path d="M200 112 C178 150 160 200 152 236 M200 112 C222 150 240 200 248 236" stroke="{PAPER}" stroke-opacity=".18" stroke-width="2.5" fill="none"/>'
    f'<circle cx="200" cy="112" r="7" fill="{shade(cap_c,.7)}" {S}/>'
    f'<path d="M96 232 C140 222 260 222 304 232 C312 250 276 266 200 268 C124 266 88 250 96 232 Z" fill="{shade(cap_c,.75)}" {S}/>'
    f'<path d="M118 242 C160 234 240 234 282 242" stroke="{PAPER}" stroke-opacity=".25" stroke-width="2" stroke-dasharray="5 6" fill="none"/>'
    + logo(200, 184, 1.9), "Classic dad cap in ink")
bh = OAT
items["bucket-hat"] = svg(
    f'<path d="M128 210 C128 150 150 120 200 120 C250 120 272 150 272 210 Z" fill="{bh}" {S}/>'
    f'<path d="M70 232 C90 196 310 196 330 232 C336 262 290 280 200 280 C110 280 64 262 70 232 Z" fill="{shade(bh,.9)}" {S}/>'
    f'<path d="M126 196 L274 196 L276 216 L124 216 Z" fill="{INK}" {S}/>'
    f'<path d="M86 246 C130 262 270 262 314 246" stroke="{INK}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="5 6" fill="none"/>'
    + logo(200, 162, 1.3, fill=TERRA), "Bucket hat in oat")

# Tees
items["tee-ink"] = svg(tee(INK, logo(232, 140, 1.15) +
    f'<text x="200" y="232" text-anchor="middle" {FONT} font-size="26" fill="{PAPER}" letter-spacing="1">IKA PBI UII</text>'
    f'<text x="200" y="256" text-anchor="middle" {FONT} font-size="11" fill="{PAPER}" opacity=".7" letter-spacing="3">ALUMNI · EST. UII</text>'), "Alumni tee in ink")
items["tee-slogan"] = svg(tee(PAPER,
    f'<text x="200" y="196" text-anchor="middle" {FONT} font-size="16" fill="{INK}">NOBODY WALKS</text>'
    f'<text x="200" y="218" text-anchor="middle" {FONT} font-size="16" fill="{INK}">ALONE AFTER</text>'
    f'<text x="200" y="240" text-anchor="middle" {FONT} font-size="16" fill="{TERRA}">GRADUATION.</text>'), "Slogan tee in off-white")

# Outerwear
items["crewneck"] = svg(longsleeve(OAT) + f'<path d="{NECK}" fill="{shade(OAT,.85)}" {S}/>' +
    f'<text x="200" y="196" text-anchor="middle" {FONT} font-size="30" fill="{INK}" letter-spacing="1">PBI UII</text>'
    + logo(200, 236, 1.1), "Crewneck sweatshirt in oat")
hood = INK
items["hoodie"] = svg(
    f'<path d="M138 86 C128 40 168 20 200 20 C232 20 272 40 262 86 Z" fill="{shade(hood,.8)}" {S}/>'
    + longsleeve(hood) +
    f'<path d="M150 80 C160 54 240 54 250 80 C238 112 162 112 150 80 Z" fill="{shade(hood,.6)}" {S}/>'
    f'<path d="M186 104 L182 158 M214 104 L218 158" stroke="{PAPER}" stroke-width="3" stroke-linecap="round"/>'
    f'<path d="M148 248 L252 248 L268 314 L132 314 Z" fill="{shade(hood,1.5)}" {S}/>'
    + logo(200, 196, 1.5), "Hoodie in ink")
vb, vs = INK, STRIPE
snaps = "".join(f'<circle cx="207" cy="{y}" r="4" fill="{vs}"/>' for y in (130, 170, 210, 250, 290))
items["varsity-jacket"] = svg(longsleeve(vb, sleeve=vs, rib=vb) +
    f'<path d="M150 78 C160 104 240 104 250 78" stroke="{vb}" stroke-width="12" fill="none"/>'
    f'<path d="M150 78 C160 104 240 104 250 78" stroke="{vs}" stroke-width="3" fill="none"/>'
    f'<path d="M200 100 L200 318" stroke="{vs}" stroke-opacity=".5" stroke-width="3" fill="none"/>' + snaps +
    f'<path d="M60 318 L100 324 M122 324 L278 324 M300 324 L340 318" stroke="{vs}" stroke-width="3"/>'
    f'<text x="160" y="170" text-anchor="middle" {FONT} font-size="40" fill="{vs}">P</text>'
    + logo(244, 150, 1.0), "Varsity jacket in ink with oat sleeves")
cj = FOREST
items["coach-jacket"] = svg(longsleeve(cj) +
    f'<path d="M150 78 L176 132 L200 104 L224 132 L250 78 C240 96 160 96 150 78 Z" fill="{shade(cj,.8)}" {S}/>'
    f'<path d="M200 104 L200 318" {S} fill="none" opacity=".6"/>'
    + "".join(f'<circle cx="207" cy="{y}" r="3.5" fill="{PAPER}"/>' for y in (150, 195, 240, 285)) +
    f'<text x="252" y="160" text-anchor="middle" {FONT} font-size="13" fill="{PAPER}" letter-spacing="1">IKA PBI</text>'
    + logo(150, 154, .9), "Coach jacket in forest green")

# Accessories
items["tote"] = svg(
    f'<path d="M152 140 C152 64 248 64 248 140" stroke="{INK}" stroke-width="14" fill="none" stroke-linecap="round"/>'
    f'<path d="M110 130 L290 130 L304 340 L96 340 Z" fill="{CANVAS}" {S}/>'
    + logo(200, 200, 2.1) +
    f'<text x="200" y="268" text-anchor="middle" {FONT} font-size="17" fill="{INK}">NOBODY WALKS</text>'
    f'<text x="200" y="290" text-anchor="middle" {FONT} font-size="17" fill="{INK}">ALONE.</text>', "Canvas tote bag")
items["mug"] = svg(
    f'<path d="M258 178 C312 178 314 272 258 272" stroke="{INK}" stroke-width="20" fill="none" stroke-linecap="round"/>'
    f'<path d="M258 178 C304 178 306 272 258 272" stroke="{PAPER}" stroke-width="10" fill="none" stroke-linecap="round"/>'
    f'<path d="M118 140 L262 140 L262 302 C262 320 250 328 232 328 L148 328 C130 328 118 320 118 302 Z" fill="{PAPER}" {S}/>'
    f'<ellipse cx="190" cy="140" rx="72" ry="14" fill="{INK}" {S}/>'
    + logo(190, 214, 2.0) +
    f'<text x="190" y="280" text-anchor="middle" {FONT} font-size="15" fill="{INK}" letter-spacing="2">LEAN · FAST</text>', "Enamel mug")
items["notebook"] = svg(
    f'<rect x="118" y="72" width="176" height="262" rx="12" fill="{INK}" {S}/>'
    f'<rect x="118" y="72" width="22" height="262" rx="6" fill="{shade(INK,.6)}"/>'
    f'<rect x="258" y="72" width="10" height="262" fill="{TERRA}"/>'
    + logo(198, 176, 2.0, fill=shade(INK, 1.9), dots=INK) +
    f'<rect x="160" y="238" width="78" height="30" rx="4" fill="{PAPER}"/>'
    f'<text x="199" y="258" text-anchor="middle" {FONT} font-size="11" fill="{INK}" letter-spacing="1">NOTES</text>', "Hardcover notebook")
items["stickers"] = svg(
    f'<g transform="rotate(-5 200 210)"><rect x="104" y="84" width="196" height="252" rx="14" fill="#FFFFFF" {S}/>'
    + logo(160, 150, 2.0) +
    f'<circle cx="248" cy="150" r="30" fill="{INK}"/><text x="248" y="157" text-anchor="middle" {FONT} font-size="18" fill="{PAPER}">PBI</text>'
    f'<rect x="126" y="206" width="76" height="32" rx="16" fill="{OAT}" {S}/><text x="164" y="227" text-anchor="middle" {FONT} font-size="14" fill="{INK}">Lean</text>'
    f'<rect x="210" y="206" width="70" height="32" rx="16" fill="{TERRA}"/><text x="245" y="227" text-anchor="middle" {FONT} font-size="14" fill="{PAPER}">Fast</text>'
    f'<rect x="126" y="252" width="154" height="32" rx="16" fill="{FOREST}"/><text x="203" y="273" text-anchor="middle" {FONT} font-size="14" fill="{PAPER}">Transparent</text>'
    f'<text x="203" y="314" text-anchor="middle" {FONT} font-size="10" fill="{INK}" opacity=".5" letter-spacing="2">IKA PBI UII</text></g>', "Sticker sheet")

for name, content in items.items():
    (OUT / f"{name}.svg").write_text(content)
print(len(items), "files")
