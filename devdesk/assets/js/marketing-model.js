/**
 * DevDesk marketing image controls.
 *
 * Quick edits:
 * - Hide every marketing image: set `enabled` to false.
 * - Hide one placement: set that slot's `visible` to false.
 * - Change a photo: update the slot's `src` with another local image path.
 *
 * Included alternatives:
 * - assets/img/devdesk-workspace-banner.webp
 * - assets/img/devdesk-model-arms-crossed.png
 * - assets/img/devdesk-model-standing.png
 * - assets/img/devdesk-model-confident.png
 * - assets/img/devdesk-model-thoughtful.png
 */
window.DEVDESK_MODEL_CONFIG = {
  enabled: true,
  slots: {
    banner: {
      visible: true,
      src: "assets/img/devdesk-workspace-banner.webp",
      alt: "A confident developer in a modern workspace using DevDesk across desktop, laptop, and mobile screens."
    },
    finalCta: {
      visible: true,
      src: "assets/img/devdesk-model-thoughtful.png",
      alt: "A DevDesk presenter inviting visitors to choose a starting point."
    }
  }
};

(() => {
  function applyModelConfig() {
    const config = window.DEVDESK_MODEL_CONFIG || {};
    const modelsEnabled = config.enabled !== false;

    document.documentElement.dataset.marketingModels = modelsEnabled ? "visible" : "hidden";

    document.querySelectorAll("[data-model-slot]").forEach((image) => {
      const slotName = image.dataset.modelSlot;
      const slot = config.slots?.[slotName] || {};
      const region = image.closest("[data-model-region]");
      const shouldShow = Boolean(modelsEnabled && slot.visible !== false && slot.src);

      if (region) region.dataset.modelVisible = shouldShow ? "true" : "false";
      if (slotName === "banner" && region) {
        region.hidden = !shouldShow;
        region.closest(".hero-product")?.classList.toggle("hero-banner-disabled", !shouldShow);
      }
      image.hidden = !shouldShow;

      if (!shouldShow) return;

      image.src = slot.src;
      image.alt = slot.alt || "";
      image.addEventListener("error", () => {
        image.hidden = true;
        if (region) region.dataset.modelVisible = "false";
        if (slotName === "banner" && region) {
          region.hidden = true;
          region.closest(".hero-product")?.classList.add("hero-banner-disabled");
        }
      }, { once: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyModelConfig, { once: true });
  } else {
    applyModelConfig();
  }
})();
