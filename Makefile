include $(TOPDIR)/rules.mk

LUCI_TITLE:=Allure — macOS-inspired LuCI dashboard & theme
LUCI_DEPENDS:=+luci-base +luci-mod-status +luci-theme-bootstrap +rpcd-mod-ucode
LUCI_PKGARCH:=all
PKG_LICENSE:=Apache-2.0

include ../../luci.mk
# Use inside an OpenWrt/luci feed, e.g. feeds/luci/themes/luci-theme-allure.
