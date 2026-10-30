include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-allure
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-allure
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=Themes
  TITLE:=Allure - macOS-inspired LuCI dashboard & theme
  URL:=https://github.com/xCodeOn/luci-theme-allure
  DEPENDS:=+luci-base +luci-mod-status +luci-theme-bootstrap +rpcd-mod-ucode
  PKGARCH:=all
endef

define Build/Compile
endef

define Package/luci-theme-allure/install
	$(INSTALL_DIR) $(1)/www/luci-static/allure \
		$(1)/www/luci-static/resources/view/status \
		$(1)/etc/uci-defaults \
		$(1)/usr/share/luci/menu.d \
		$(1)/usr/share/rpcd/acl.d \
		$(1)/usr/share/rpcd/ucode \
		$(1)/usr/share/ucode/luci/template/themes/allure
	$(INSTALL_BIN) ./files/etc/uci-defaults/99_allure $(1)/etc/uci-defaults/99_allure
	$(INSTALL_DATA) ./files/www/luci-static/allure/* $(1)/www/luci-static/allure/
	$(INSTALL_DATA) ./files/www/luci-static/resources/* $(1)/www/luci-static/resources/
	$(INSTALL_DATA) ./files/www/luci-static/resources/view/status/* $(1)/www/luci-static/resources/view/status/
	$(INSTALL_DATA) ./files/usr/share/luci/menu.d/* $(1)/usr/share/luci/menu.d/
	$(INSTALL_DATA) ./files/usr/share/rpcd/acl.d/* $(1)/usr/share/rpcd/acl.d/
	$(INSTALL_DATA) ./files/usr/share/rpcd/ucode/* $(1)/usr/share/rpcd/ucode/
	$(INSTALL_DATA) ./files/usr/share/ucode/luci/template/themes/allure/* $(1)/usr/share/ucode/luci/template/themes/allure/
endef

$(eval $(call BuildPackage,luci-theme-allure))
