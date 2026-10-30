include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-allure
PKG_VERSION:=1.5.1
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-allure
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=Themes
  TITLE:=Allure - macOS-inspired LuCI dashboard & theme
  URL:=https://github.com/xCodeOn/OpenWRT-Theme-Allure
  DEPENDS:=+luci-base +luci-mod-status +luci-theme-bootstrap +rpcd-mod-ucode
  PKGARCH:=all
endef

define Build/Compile
endef

define Package/luci-theme-allure/install
	$(INSTALL_DIR) $(1)/etc/uci-defaults $(1)/www $(1)/usr/share/ucode/luci
	$(INSTALL_BIN) ./files/etc/uci-defaults/99_allure $(1)/etc/uci-defaults/99_allure
	$(CP) ./files/www/* $(1)/www/
	$(CP) ./files/usr/share/* $(1)/usr/share/
endef

$(eval $(call BuildPackage,luci-theme-allure))
