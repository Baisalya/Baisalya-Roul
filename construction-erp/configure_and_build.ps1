param(
  [string]$PublisherName,
  [string]$SupportEmail,
  [string]$SiteUrl,
  [string]$GooglePlayUrl = '',
  [string]$MicrosoftStoreUrl = '',
  [string]$AndroidDirectUrl = '',
  [string]$WindowsDirectUrl = ''
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $Root 'site.config.json'

if (-not $PublisherName) { $PublisherName = Read-Host 'Legal publisher/developer name' }
if (-not $SupportEmail) { $SupportEmail = Read-Host 'Public support email' }
if (-not $SiteUrl) { $SiteUrl = Read-Host 'Final HTTPS website URL (no trailing slash)' }

$PublisherName = $PublisherName.Trim()
$SupportEmail = $SupportEmail.Trim()
$SiteUrl = $SiteUrl.Trim().TrimEnd('/')

if ($PublisherName.Length -lt 2) { throw 'Publisher name is required.' }
if ($SupportEmail -notmatch '^[^@\s]+@[^@\s]+\.[^@\s]+$') { throw 'Enter a valid public support email.' }
if ($SiteUrl -notmatch '^https://[^\s/]+(?:/.*)?$') { throw 'Site URL must be a public HTTPS URL.' }

$config = Get-Content -LiteralPath $ConfigPath -Raw | ConvertFrom-Json
$config.publisherName = $PublisherName
$config.supportEmail = $SupportEmail
$config.siteUrl = $SiteUrl

if ($GooglePlayUrl) {
  if ($GooglePlayUrl -notmatch '^https://') { throw 'Google Play URL must use HTTPS.' }
  $config.platforms.android.storeUrl = $GooglePlayUrl.Trim()
  $config.platforms.android.enabled = $true
}
if ($AndroidDirectUrl) {
  if ($AndroidDirectUrl -notmatch '^https://') { throw 'Android direct URL must use HTTPS.' }
  $config.platforms.android.directUrl = $AndroidDirectUrl.Trim()
  $config.platforms.android.enabled = $true
}
if ($MicrosoftStoreUrl) {
  if ($MicrosoftStoreUrl -notmatch '^https://') { throw 'Microsoft Store URL must use HTTPS.' }
  $config.platforms.windows.storeUrl = $MicrosoftStoreUrl.Trim()
  $config.platforms.windows.enabled = $true
}
if ($WindowsDirectUrl) {
  if ($WindowsDirectUrl -notmatch '^https://') { throw 'Windows direct URL must use HTTPS.' }
  $config.platforms.windows.directUrl = $WindowsDirectUrl.Trim()
  $config.platforms.windows.enabled = $true
}

$config | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $ConfigPath -Encoding UTF8

$releaseDefines = [ordered]@{
  APP_ENV = 'production'
  ENABLE_GOOGLE_SIGN_IN = 'true'
  PRIVACY_POLICY_URL = "$SiteUrl/privacy.html"
  TERMS_OF_SERVICE_URL = "$SiteUrl/terms.html"
  ACCOUNT_DELETION_URL = "$SiteUrl/account-deletion.html"
  SUPPORT_URL = "$SiteUrl/support.html"
  SUPPORT_EMAIL = $SupportEmail
}
$releaseDefines | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $Root 'release_defines.website.json') -Encoding UTF8

Push-Location $Root
try {
  py -3 .\scripts\build_site.py
  if ($LASTEXITCODE -ne 0) { throw 'Website build failed.' }
  py -3 .\scripts\validate_site.py
  if ($LASTEXITCODE -ne 0) { throw 'Website validation failed.' }
} finally {
  Pop-Location
}

Write-Host ''
Write-Host 'WEBSITE BUILD PASSED' -ForegroundColor Green
Write-Host "Deploy this folder: $Root\dist"
Write-Host "App URL settings created: $Root\release_defines.website.json"
