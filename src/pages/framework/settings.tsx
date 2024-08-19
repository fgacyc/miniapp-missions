import NavBar from "../../components/nav-bar";
// import {useSettingsStore} from "../../store/settings-store";
import Block from "../../components/block.tsx";
import {useTranslation} from "react-i18next";
// import { Button } from "../../components/ui/button.tsx";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Input } from "../../components/ui/input.tsx";
import {useSettingsStore} from "../../store/settings-store.ts";
import {Switch} from "../../components/ui/switch.tsx";
import {useEffect} from "react";

export default function Settings() {
    const [isDarkMode,toggleDarkMode] = useSettingsStore(state => [state.isDarkMode,state.toggleDarkMode]);
    const [radioValue,setRadioValue] = useSettingsStore(state => [state.radioValue,state.setRadioValue])
    const [inputValue,setInputValue] = useSettingsStore(state => [state.inputValue,state.setInputValue])
    const { t } = useTranslation();

    useEffect(() => {
        console.log(radioValue)
    }, [radioValue]);

    return (
        <div className={"h-screen"}>
            <NavBar>{t("Settings")}</NavBar>
            <Block title={undefined}>
                <div className={"py-2 flex flex-row justify-between items-center"}>
                    <div className={"text-base"}>Dark Mode</div>
                    <Switch
                        checked={isDarkMode}
                        onCheckedChange={()=>{
                            toggleDarkMode()
                            console.log(isDarkMode)
                        }}
                            aria-label="Automatic updates"/>
                </div>
            </Block>

            <Block title={undefined}>
                <RadioGroup defaultValue="option-one"
                    onValueChange={setRadioValue}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                    </div>
                </RadioGroup>
            </Block>

            <Block title='Input'>
                <Input type="email" placeholder="Email"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                />
            </Block>
        </div>
    )
}