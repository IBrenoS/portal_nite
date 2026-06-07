import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = ROOT / "public" / "models" / "oportunidades" / "sync-key-stage-blender.glb"
POSTER_PATH = ROOT / "public" / "images" / "oportunidades" / "sync-key-stage-poster-blender.png"


KEYS = [
    {
        "letter": "S",
        "position": (-2.34, 0.26, -0.26),
        "rotation": (0.2, -0.28, -0.18),
        "scale": 1.08,
    },
    {
        "letter": "Y",
        "position": (-0.9, -0.58, 0.18),
        "rotation": (0.38, 0.08, -0.14),
        "scale": 0.98,
    },
    {
        "letter": "N",
        "position": (0.88, 0.18, -0.12),
        "rotation": (0.18, -0.14, 0.08),
        "scale": 1.05,
    },
    {
        "letter": "C",
        "position": (2.32, -0.28, 0.08),
        "rotation": (0.28, 0.22, 0.2),
        "scale": 0.99,
    },
]


def set_bsdf_input(material, name, value):
    bsdf = material.node_tree.nodes.get("Principled BSDF")
    if bsdf and name in bsdf.inputs:
        bsdf.inputs[name].default_value = value


def make_material(name, color, roughness=0.35, metallic=0.0, alpha=1.0, emission=None):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    material.diffuse_color = color
    material.use_screen_refraction = alpha < 1
    material.blend_method = "BLEND" if alpha < 1 else "OPAQUE"
    material.show_transparent_back = True

    set_bsdf_input(material, "Base Color", color)
    set_bsdf_input(material, "Alpha", alpha)
    set_bsdf_input(material, "Roughness", roughness)
    set_bsdf_input(material, "Metallic", metallic)
    set_bsdf_input(material, "Coat Weight", 1.0 if alpha < 1 else 0.7)
    set_bsdf_input(material, "Coat Roughness", 0.08 if alpha < 1 else 0.2)
    set_bsdf_input(material, "Transmission Weight", 0.28 if alpha < 1 else 0.0)
    set_bsdf_input(material, "IOR", 1.45)

    if emission:
        set_bsdf_input(material, "Emission Color", emission[0])
        set_bsdf_input(material, "Emission Strength", emission[1])

    return material


MAT_BODY = make_material("keycap_black_body", (0.005, 0.005, 0.005, 1), 0.42, 0.16)
MAT_FACE = make_material("keycap_front_plate", (0.02, 0.02, 0.018, 1), 0.36, 0.12)
MAT_GLASS = make_material("transparent_smoked_glass", (0.015, 0.017, 0.017, 0.2), 0.24, 0.18, 0.2)
MAT_EDGE = make_material("soft_glass_edge", (0.74, 0.74, 0.7, 0.32), 0.18, 0.0, 0.32)
MAT_LETTER = make_material(
    "raised_letter_white",
    (0.92, 0.92, 0.88, 1),
    0.24,
    0.02,
    1.0,
    ((0.88, 0.88, 0.82, 1), 0.18),
)
MAT_HIGHLIGHT = make_material("soft_reflection_plane", (1, 1, 1, 0.2), 0.12, 0.0, 0.2)
MAT_BLUE = make_material("cool_blue_reflection", (0.42, 0.82, 1, 0.16), 0.2, 0.0, 0.16)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def apply_modifier(obj, modifier_name):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.modifier_apply(modifier=modifier_name)
    finally:
        obj.select_set(False)


def apply_object_transform(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    finally:
        obj.select_set(False)


def add_bevel(obj, amount, segments):
    bevel = obj.modifiers.new("soft bevel", "BEVEL")
    bevel.width = amount
    bevel.segments = segments
    bevel.affect = "EDGES"

    weighted = obj.modifiers.new("weighted normals", "WEIGHTED_NORMAL")
    weighted.keep_sharp = True

    apply_modifier(obj, bevel.name)
    apply_modifier(obj, weighted.name)


def add_wireframe(obj, thickness):
    wireframe = obj.modifiers.new("thin glass edges", "WIREFRAME")
    wireframe.thickness = thickness
    wireframe.use_even_offset = True
    apply_modifier(obj, wireframe.name)


def make_box(name, dimensions, location, material, bevel=0.04, segments=4, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    apply_object_transform(obj)
    obj.data.materials.append(material)
    if bevel:
        add_bevel(obj, bevel, segments)
    if parent:
        obj.parent = parent
    return obj


def make_tapered_body(letter, parent):
    front_width = 1.42
    front_height = 1.06
    back_width = 1.92
    back_height = 1.5
    depth = 0.78
    front_y = -depth / 2
    back_y = depth / 2

    vertices = [
        (-front_width / 2, front_y, -front_height / 2),
        (front_width / 2, front_y, -front_height / 2),
        (front_width / 2, front_y, front_height / 2),
        (-front_width / 2, front_y, front_height / 2),
        (-back_width / 2, back_y, -back_height / 2),
        (back_width / 2, back_y, -back_height / 2),
        (back_width / 2, back_y, back_height / 2),
        (-back_width / 2, back_y, back_height / 2),
    ]
    faces = [
        (0, 1, 2, 3),
        (5, 4, 7, 6),
        (4, 0, 3, 7),
        (1, 5, 6, 2),
        (3, 2, 6, 7),
        (4, 5, 1, 0),
    ]

    mesh = bpy.data.meshes.new(f"{letter}-body-mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()

    obj = bpy.data.objects.new(f"{letter}-body", mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(MAT_BODY)
    obj.location.y = 0.08
    obj.parent = parent
    add_bevel(obj, 0.055, 8)
    return obj


def make_text(letter, parent):
    bpy.ops.object.text_add(
        location=(0, -0.47, -0.025),
        rotation=(math.radians(90), 0, 0),
    )
    obj = bpy.context.object
    obj.name = f"{letter}-letter"
    obj.data.body = letter
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.size = 0.68
    obj.data.extrude = 0.038
    obj.data.bevel_depth = 0.004
    obj.data.resolution_u = 16
    obj.data.materials.append(MAT_LETTER)
    obj.parent = parent

    bpy.ops.object.convert(target="MESH")
    obj = bpy.context.object
    obj.name = f"{letter}-letter"
    obj.parent = parent
    add_bevel(obj, 0.002, 2)
    return obj


def make_plane(name, width, height, location, rotation, material, parent):
    bpy.ops.mesh.primitive_plane_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (width, height, 1)
    apply_object_transform(obj)
    obj.data.materials.append(material)
    obj.parent = parent
    return obj


def make_key(letter):
    empty = bpy.data.objects.new(f"SYNC_KEY_{letter}", None)
    empty.empty_display_type = "CUBE"
    empty.empty_display_size = 1
    empty["syncKey"] = letter.lower()
    bpy.context.collection.objects.link(empty)

    make_tapered_body(letter, empty)
    make_box(f"{letter}-face", (1.19, 0.08, 0.87), (0, -0.43, -0.01), MAT_FACE, 0.035, 6, empty)
    make_text(letter, empty)
    make_box(f"{letter}-shell", (1.98, 1.02, 1.54), (0, 0, 0), MAT_GLASS, 0.075, 10, empty)
    edges = make_box(f"{letter}-shell-edges", (2.0, 1.04, 1.56), (0, 0, 0), MAT_EDGE, 0.02, 2, empty)
    add_wireframe(edges, 0.015)
    make_plane(
        f"{letter}-side-reflection",
        0.12,
        0.54,
        (-0.7, -0.51, 0.02),
        (math.radians(90), 0, math.radians(-7)),
        MAT_HIGHLIGHT,
        empty,
    )
    make_plane(
        f"{letter}-top-glint",
        0.52,
        0.035,
        (0, -0.52, 0.46),
        (math.radians(90), 0, 0),
        MAT_HIGHLIGHT,
        empty,
    )
    make_plane(
        f"{letter}-cool-reflection",
        0.36,
        0.12,
        (0.45, -0.515, -0.16),
        (math.radians(90), 0, math.radians(8)),
        MAT_BLUE,
        empty,
    )

    return empty


def look_at(obj, target):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def export_model(keys):
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    for key in keys:
        key.location = (0, 0, 0)
        key.rotation_euler = (0, 0, 0)
        key.scale = (1, 1, 1)

    bpy.ops.export_scene.gltf(
        filepath=str(MODEL_PATH),
        export_format="GLB",
        export_extras=True,
        export_apply=True,
        export_materials="EXPORT",
    )


def render_poster(keys):
    POSTER_PATH.parent.mkdir(parents=True, exist_ok=True)

    for obj in bpy.context.scene.objects:
        obj.select_set(False)

    for config, key in zip(KEYS, keys):
        x, y, z = config["position"]
        rx, ry, rz = config["rotation"]
        key.location = (x, -z, y)
        key.rotation_euler = (rx, -rz, ry)
        key.scale = (config["scale"], config["scale"], config["scale"])

    bpy.ops.object.light_add(type="AREA", location=(-3.6, -4.2, 3.0))
    key_light = bpy.context.object
    key_light.name = "poster_key_light"
    key_light.data.energy = 430
    key_light.data.size = 4.0

    bpy.ops.object.light_add(type="POINT", location=(2.6, -3.4, -1.6))
    rim = bpy.context.object
    rim.name = "poster_cool_rim"
    rim.data.energy = 90
    rim.data.color = (0.5, 0.85, 1)

    bpy.ops.object.camera_add(location=(0, -8.6, 0.08))
    camera = bpy.context.object
    camera.name = "poster_camera"
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 10.25
    look_at(camera, (0, 0, -0.05))
    bpy.context.scene.camera = camera

    bpy.context.scene.render.engine = "BLENDER_EEVEE"
    bpy.context.scene.eevee.taa_render_samples = 96
    bpy.context.scene.render.film_transparent = True
    bpy.context.scene.view_settings.view_transform = "Filmic"
    bpy.context.scene.view_settings.look = "Medium High Contrast"
    bpy.context.scene.view_settings.exposure = 0
    bpy.context.scene.view_settings.gamma = 1
    bpy.context.scene.render.resolution_x = 620
    bpy.context.scene.render.resolution_y = 832
    bpy.context.scene.render.image_settings.file_format = "PNG"
    bpy.context.scene.render.filepath = str(POSTER_PATH)
    bpy.ops.render.render(write_still=True)


def main():
    clear_scene()
    keys = [make_key(config["letter"]) for config in KEYS]
    export_model(keys)
    render_poster(keys)
    print(f"Exported {MODEL_PATH}")
    print(f"Rendered {POSTER_PATH}")


if __name__ == "__main__":
    main()
